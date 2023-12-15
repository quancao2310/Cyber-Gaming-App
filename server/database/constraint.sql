USE cyber_gaming;

ALTER TABLE `product_image`
ADD CONSTRAINT `fk_product_image_product_id`
FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE;

ALTER TABLE `invoice_product`
ADD CONSTRAINT `fk_invoice_product_product_id`
FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE SET NULL;
