const item_w = document.getElementById("width");
const item_l = document.getElementById("length");
const item_h = document.getElementById("height");
const submit = document.querySelector(".submit");
const result = document.querySelector(".result");
//имеет ли значение, что является чем, если при вращении все поменятется?
// let box_1 = { w: 10, l: 30, h: 12 },
//     box_2 = { w: 14, l: 12, h: 20 },
//     box_3 = { w: 5, l: 24, h: 7 };
let box_1 = [13, 30, 12],
    box_2 = [14, 12, 20],
    box_3 = [5, 24, 7];
// [box_1, box_2, box_3].forEach(obj => obj.price = obj.w * obj.l * obj.h);
[box_1, box_2, box_3].forEach(obj => {
    obj.sort(function (a, b) { return a - b });
    obj.price = obj[0] * obj[1] * obj[2];
});

function WhichBoxFits() {
    let boxes = [box_1, box_2, box_3],
        item_props = [item_w.value, item_l.value, item_h.value].sort(function (a, b) { return a - b })
    boxes.forEach(arr => {
        for (let i = 0; i < 3; i++) {
            if (~~arr[i] < ~~item_props[i]) {
                delete boxes[boxes.indexOf(arr)];
                break;
            }
        }
    })
    return boxes.filter(Boolean);
}

function SearchTheBestBox(e) {
    let matching_boxes = WhichBoxFits(),
        m_boxes_len = matching_boxes.length;
    if (m_boxes_len == 0) {
        result.innerText = `Нет подходящей коробки`
    } else {
        let min_price = matching_boxes[0].price, best_box = matching_boxes[0];
        for (let i = 0; i < m_boxes_len; i++) {
            let box = matching_boxes[i];
            if (box.price < min_price) {
                min_price = box.price;
                best_box = box;
            }
        }
        result.innerText = `Цена самой подходящей коробки: ${best_box.price}`
    }
}

submit.addEventListener('click', (ev) => { SearchTheBestBox(ev) });