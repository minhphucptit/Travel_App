function checkInput(originValue, destinationValue){
    let urlRGEX = /^[a-zA-Z\s]{0,255}$/;
    if (urlRGEX.test(originValue) && urlRGEX.test(destinationValue)) {
      return
    } else {
      alert("Please enter a valid place");
    } 
}

export {checkInput}