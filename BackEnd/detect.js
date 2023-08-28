import * as tf from "@tensorflow/tfjs-node";
import fs from "fs";
import gm from "gm";
import { EuclideanDistTracker } from "./tracker.js";

const imagePath = "./Image/CaptureImage.jpg";
let tracker = new EuclideanDistTracker();
let countnumber;
const preprocess = (source, modelWidth, modelHeight) => {
  let xRatio, yRatio; // ratios for boxes
  const input = tf.tidy(() => {
    const img = source;

    // padding image to square => [n, m] to [n, n], n > m
    const [h, w] = img.shape.slice(0, 2);
    const maxSize = Math.max(w, h); // get max size
    const imgPadded = img.pad([
      [0, maxSize - h], // padding y [bottom only]
      [0, maxSize - w], // padding x [right only]
      [0, 0],
    ]);
    xRatio = maxSize / w; // update xRatio
    yRatio = maxSize / h; // update yRatio

    return tf.image
      .resizeBilinear(imgPadded, [modelWidth, modelHeight]) // resize frame
      .div(255.0) // normalize
      .expandDims(0); // add batch
  });
  // console.log("img ",input)

  return [input, xRatio, yRatio];
};

export const detectImage = async (imgSource, model, classThreshold) => {
  const [modelWidth, modelHeight] = model.inputShape.slice(1, 3); // get model width and height
  tf.engine().startScope(); // start scoping tf engine
  const [input, xRatio, yRatio] = preprocess(
    imgSource,
    modelWidth,
    modelHeight
  );

  const res = await model.net.executeAsync(input); //Detect

  const [boxes, scores, classes, num] = res.slice();
  const class_data = classes.dataSync();
  const boxes_data = boxes.dataSync();
  const scores_data = scores.dataSync();
  const num_data = num.dataSync();

  const pic = gm(imagePath);

  let detectionspush = [];

  for (let i = 0; i < scores_data.length; ++i) {
    if (scores_data[i] > classThreshold) {
      // console.log("scores_data: ", scores_data[i]);
      let [xmin, ymin, xmax, ymax] = boxes_data.slice(i * 4, (i + 1) * 4);
      xmin *= 640 * xRatio;
      xmax *= 640 * xRatio;
      ymin *= 480 * yRatio;
      ymax *= 480 * yRatio;

      const boxWidth = xmax - xmin;
      const boxHeight = ymax - ymin;

      pic
        .stroke("#ff0000", 2)
        .fill("None")
        .drawRectangle(xmin, ymin, xmin + boxWidth, ymin + boxHeight);
      detectionspush.push([xmin, ymin, xmin + boxWidth, ymin + boxHeight]);
    }
  }
  console.log("Count: ", num_data[0]);
  countnumber = num_data[0];
  const savedata = (num_data) => {
    if (num_data > 0) {
      const now = new Date();
      const dateTime = now.toLocaleString();
      // สร้างข้อมูล CSV ที่มีคอลัมน์ใหม่
      const data = `${num_data},${dateTime}\n`; // ใช้เครื่องหมาย , เพื่อแยกคอลัมน์
      // บันทึกข้อมูลลงในไฟล์ CSV
      fs.appendFile("data.csv", data, (err) => {
        if (err) {
          console.error("เกิดข้อผิดพลาดในการบันทึกไฟล์ CSV:", err);
        } else {
          console.log("บันทึกข้อมูลเรียบร้อยแล้ว", dateTime);
        }
      });
    }
  };
  await savedata(num_data[0]);
  //object tracking
  const boxes_ids = tracker.update(detectionspush);
  for (let box_id of boxes_ids) {
    let [x1, y1, width, height, id] = box_id;
    pic
      .fill("#ff0000")
      .font('Arial', 27)
      .drawText(x1 + 15, y1 - 10, id);
    // console.log(id);
  }

  const outputImagePath = "./Image/CaptureImageWithBoxes.jpg";
  pic.write(outputImagePath, (err) => {
    if (!err) console.log("draw successful");
  });

  tf.dispose(res); // clear memory
  tf.engine().endScope(); // end of scoping

  return countnumber;
};
