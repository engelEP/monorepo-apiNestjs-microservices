import { Customer } from "../../customers/entities/customer.entity";
import { InvoiceDetail } from "../../invoice-details/entities/invoice-detail.entity";
import { Seller } from "../../sellers/entities/seller.entity";
import { floatTransformer } from "../../utils/floatTransformer";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;
    
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        transformer: new floatTransformer()
    })
    total: number;
    
    @ManyToOne(() => Customer, (customer) => customer.invoices)
    customer: Customer;

    @ManyToOne(() => Seller, (seller) => seller.invoices)
    seller: Seller;

    @OneToMany(() => InvoiceDetail, (InvoiceDetail) => InvoiceDetail.invoice)
    invoiceDetails: InvoiceDetail[]
}
