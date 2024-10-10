package com.example.ShopiShop.servicesIMPL;

import com.example.ShopiShop.dto.request.OrderRequestDTO;
import com.example.ShopiShop.dto.response.OrderResponseDTO;
import com.example.ShopiShop.enums.OrderStatusEnum;
import com.example.ShopiShop.exceptions.EntityNotFoundException;
import com.example.ShopiShop.mappers.OrderMapper;
import com.example.ShopiShop.models.*;
import com.example.ShopiShop.repositories.DeliveryRepository;
import com.example.ShopiShop.repositories.OrderRepository;
import com.example.ShopiShop.repositories.PaymentRepository;
import com.example.ShopiShop.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private OrderMapper orderMapper;

    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        User user = new User();  // Fetch user from DB or security context (e.g., @AuthenticationPrincipal)
        List<Product> products = productRepository.findAllById(orderRequestDTO.getProductIds());

        Payment payment = orderMapper.toPaymentEntity(orderRequestDTO.getPayment());
        Delivery delivery = orderMapper.toDeliveryEntity(orderRequestDTO.getDelivery(), new Location());  // Location should be fetched from LocationRepository

        Order order = orderMapper.toEntity(orderRequestDTO, user, products, payment, delivery);
        order.setOrderDate(new Date());
        order.setStatus(OrderStatusEnum.PENDING);

        orderRepository.save(order);

        return orderMapper.toResponse(order);
    }

    public List<OrderResponseDTO> getOrdersByUser(Long id) {
        return orderRepository.findById(id).stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    public OrderResponseDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        return orderMapper.toResponse(order);
    }

    public void updateOrderStatus(Long orderId, OrderStatusEnum status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
    }
}
