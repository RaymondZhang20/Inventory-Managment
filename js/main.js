const pageList = ["home_page", "about_page"];

function clickNavBar(item) {
  var activeBar = document.getElementsByClassName("active")[0];
  if (activeBar !== null) activeBar.classList.remove("active");
  item.classList.add("active");
  pageList.forEach((page)=>{
    document.getElementById(page).classList.add("hidden");
  });
  document.getElementById(item.id.split("_")[0] + "_page").classList.remove("hidden");
}

function loadInventory() {
  fetch('./data/inventory.json').then((res) => {
    return res.json();
  }).then((dataset) => {
    if (dataset !== undefined) {
      dataset.forEach((data) => {
        addData(data["item_name"], data["description"], data["price"], data["image"]);
      });
    }
  });
}

function addData(name, description, price, img) {
  if (img === "none" || img === "") {
    img = "./icon.png";
  }
  var newItem = document.createElement("div");
  newItem.classList.add("card");
  newItem.innerHTML = "<img src="+`${img}`+" alt="+`${name}`+" class=\"card_image\">\n" +
    "<div class=\"card_content\">\n" +
    "<h2 class=\"card_name\">"+`${name}`+"</h2>\n" +
    "<p class=\"card_description\">"+`${description}`+"</p>\n" +
    "<p class=\"card_price\">$"+`${price}`+"</p>\n" +
    "</div>"
  document.getElementById("inv_list").appendChild(newItem);
}

function addItem() {
  addData(document.getElementById("name_form").value, document.getElementById("description_form").value,
  document.getElementById("price_form").value, document.getElementById("image_form").value);
  clearForm();
}

function clearForm() {
  document.getElementById("name_form").value = "";
  document.getElementById("description_form").value = "";
  document.getElementById("price_form").value = "";
  document.getElementById("image_form").value = "";
}

function deleteAllCards() {
  document.getElementById("inv_list").innerHTML = "";
}
