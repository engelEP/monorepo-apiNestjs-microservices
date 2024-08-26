import { Invoice } from "../../invoices/entities/invoice.entity";
import { Product } from "../../products/entities/product.entity";
import { floatTransformer } from "../../utils/floatTransformer";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvoiceDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new floatTransformer()
    })
    quantity: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: new floatTransformer()
    })
    price: number;

    @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
    invoice: Invoice;

    @ManyToOne(() => Product, (product) => product.invoicesDetails)
    product: Product;
}
