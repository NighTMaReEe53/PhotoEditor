const imgBox = document.querySelector(".theimage"),
  theImage = imgBox.querySelector("img"),
  theUpload = document.getElementById("upload"),
  saturate = document.getElementById("saturate"),
  contrast = document.getElementById("contrast"),
  brightness = document.getElementById("brightness"),
  sepia = document.getElementById("sepia"),
  greyscale = document.getElementById("greyscale"),
  blur = document.getElementById("blur"),
  hue = document.getElementById("hue"),
  theDownload = document.getElementById("download"),
  theReset = document.getElementById("reset"),
  theCanv = document.getElementById("canv");

let theCanvText = theCanv.getContext("2d");

window.addEventListener("load", () => {
  theDownload.style.display = "none";
  theReset.style.display = "none";
  imgBox.style.display = "none";
});

theUpload.addEventListener("change", () => {
  resetValue();
  theDownload.style.display = "flex";
  theReset.style.display = "flex";
  imgBox.style.display = "block";
  let readFile = new FileReader();
  readFile.readAsDataURL(theUpload.files[0]);
  readFile.onload = function () {
    theImage.src = readFile.result;
  };
  theImage.onload = function () {
    theCanv.width = theImage.width;
    theCanv.height = theImage.height;
    theCanvText.drawImage(theImage, 0, 0, theCanv.width, theCanv.height);
    theImage.style.display = "none";
  };
});

let theInputS = document.querySelectorAll("ul li input");

theInputS.forEach((input) => {
  input.addEventListener("input", () => {
    theCanvText.filter = `
      saturate(${saturate.value}%)
      contrast(${contrast.value}%)
      brightness(${brightness.value}%)
      sepia(${sepia.value}%)
      grayscale(${greyscale.value})
      blur(${blur.value}px)
      hue-rotate(${hue.value}deg)
      `;
    theCanvText.drawImage(theImage, 0, 0, theCanv.width, theCanv.height);
  });
});

theReset.addEventListener("click", () => {
  resetValue();
});

function resetValue() {
  theImage.style.filter = "none";
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  greyscale.value = "0";
  blur.value = "0";
  hue.value = "0";
}

theDownload.addEventListener("click", () => {
  theDownload.href = theCanv.toDataURL()
});
