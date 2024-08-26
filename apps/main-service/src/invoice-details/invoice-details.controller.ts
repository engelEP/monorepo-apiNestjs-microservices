import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoiceDetailsService } from './invoice-details.service';
import { CreateInvoiceDetailDto } from './dto/create-invoice-detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice-detail.dto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('invoice-details')
export class InvoiceDetailsController {
  constructor(private readonly invoiceDetailsService: InvoiceDetailsService) {}

  @Post()
  @UseGuards(RolesGuard)
  create(@Body() createInvoiceDetailDto: CreateInvoiceDetailDto) {
    return this.invoiceDetailsService.create(createInvoiceDetailDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  findAll() {
    return this.invoiceDetailsService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.invoiceDetailsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateInvoiceDetailDto: UpdateInvoiceDetailDto) {
    return this.invoiceDetailsService.update(+id, updateInvoiceDetailDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.invoiceDetailsService.remove(+id);
  }
}
