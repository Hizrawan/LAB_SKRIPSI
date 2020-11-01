class LabOrder {
    constructor(id, lab_name, lab_id, order_name, order_code, lab_address, open_status,imageUrl,price) {
        this.id = id;
        this.lab_name = lab_name;
        this.lab_id = lab_id;
        this.order_name = order_name;
        this.order_code = order_code;
        this.lab_address = lab_address;
        this.open_status = open_status;
        this.imageUrl = imageUrl;
        this.price = price;
        // this.description = description;
        // this.price = price;

    }
}

export default LabOrder;