USE cyber_gaming;

ALTER TABLE `product_image`
ADD CONSTRAINT `fk_product_image_product_id`
FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

ALTER TABLE `invoice_product`
ADD CONSTRAINT `fk_invoice_product_product_id`
FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

ALTER TABLE `invoice_discount`
ADD CONSTRAINT `fk_invoice_discount_discount_id`
FOREIGN KEY (`discount_id`) REFERENCES `discount_event` (`id`) ON DELETE CASCADE;
