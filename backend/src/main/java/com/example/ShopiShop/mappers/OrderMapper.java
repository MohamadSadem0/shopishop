package com.example.ShopiShop.mappers;

import com.example.ShopiShop.dto.request.DeliveryRequestDTO;
import com.example.ShopiShop.dto.request.OrderRequestDTO;
import com.example.ShopiShop.dto.request.PaymentRequestDTO;
import com.example.ShopiShop.dto.response.DeliveryResponseDTO;
import com.example.ShopiShop.dto.response.OrderResponseDTO;
import com.example.ShopiShop.dto.response.PaymentResponseDTO;
import com.example.ShopiShop.enums.OrderStatusEnum;
import com.example.ShopiShop.enums.PaymentMethodEnum;
import com.example.ShopiShop.models.*;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    /**
     * Converts an Order entity to an OrderResponseDTO.
     * @param order The order entity.
     * @return The order response DTO.
     */
    public OrderResponseDTO toResponse(Order order) {
        return OrderResponseDTO.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .productIds(order.getProducts().stream().map(Product::getId).collect(Collectors.toList()))
                .payment(toPaymentResponse(order.getPayment()))
                .delivery(toDeliveryResponse(order.getDelivery()))
                .orderStatus(order.getStatus().name())
                .orderDate(order.getOrderDate())
                .build();
    }

    /**
     * Converts an OrderRequestDTO to an Order entity.
     * @param dto The order request DTO.
     * @param user The user placing the order.
     * @param products The list of products in the order.
     * @param payment The payment entity.
     * @param delivery The delivery entity.
     * @return The order entity.
     */
    public Order toEntity(OrderRequestDTO dto, User user, List<Product> products, Payment payment, Delivery delivery) {
        return Order.builder()
                .user(user)
                .products(products)
                .payment(payment)
                .delivery(delivery)
                .status(OrderStatusEnum.PENDING)  // Default to PENDING status initially
                .orderDate(new Date())
                .build();
    }

    /**
     * Converts a Payment entity to a PaymentResponseDTO.
     * @param payment The payment entity.
     * @return The payment response DTO.
     */
    public PaymentResponseDTO toPaymentResponse(Payment payment) {
        return PaymentResponseDTO.builder()
                .id(payment.getId())
                .paymentMethod(payment.getPaymentMethod().name())  // Converting Enum to String
                .amount(payment.getAmount())
                .paymentStatus(payment.getPaymentStatus())
                .build();
    }

    /**
     * Converts a PaymentRequestDTO to a Payment entity.
     * @param dto The payment request DTO.
     * @return The payment entity.
     */
    public Payment toPaymentEntity(PaymentRequestDTO dto) {
        return Payment.builder()
                .paymentMethod(PaymentMethodEnum.valueOf(dto.getPaymentMethod().toUpperCase()))  // Enum conversion
                .amount(dto.getAmount())
                .paymentStatus("PENDING")  // Default status to PENDING
                .build();
    }

    /**
     * Converts a Delivery entity to a DeliveryResponseDTO.
     * @param delivery The delivery entity.
     * @return The delivery response DTO.
     */
    public DeliveryResponseDTO toDeliveryResponse(Delivery delivery) {
        return DeliveryResponseDTO.builder()
                .id(delivery.getId())
                .locationId(delivery.getDeliveryAddress().getId())  // Get delivery address ID
                .deliveryStatus(delivery.getDeliveryStatus())
                .deliveryDate(delivery.getDeliveryDate())
                .build();
    }

    /**
     * Converts a DeliveryRequestDTO and Location entity to a Delivery entity.
     * @param dto The delivery request DTO.
     * @param location The location entity for the delivery address.
     * @return The delivery entity.
     */
    public Delivery toDeliveryEntity(DeliveryRequestDTO dto, Location location) {
        return Delivery.builder()
                .deliveryAddress(location)
                .deliveryDate(dto.getDeliveryDate())
                .deliveryStatus("PENDING")  // Default status to PENDING
                .build();
    }
}
