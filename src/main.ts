import Attachment from "./model/attachment";
import Field from "./model/field";

const attachment = new Attachment('good', [new Field('残高', '810')]);

console.log(JSON.stringify(attachment));
