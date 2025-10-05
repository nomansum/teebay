import React from 'react';
import { Card, Text, Group, Badge, Button } from '@mantine/core';

const ProductCard = ({ product, onEdit, onDelete, onView }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group position="apart" mb="xs">
        <Text weight={500}>{product.title}</Text>
        <Badge color="pink" variant="light">
          {product.categories.join(', ')}
        </Badge>
      </Group>
      <Text size="sm" color="dimmed">
        {product.description}
      </Text>
      <Group position="apart" mt="md">
        <Text size="sm">Price: ${product.buyPrice}</Text>
        <Text size="sm">Rent: ${product.price} per {product.pricingType}</Text>
      </Group>
      <Group position="right" mt="md">
        <Button variant="light" color="blue" size="xs" onClick={onView}>View</Button>
        <Button variant="light" color="green" size="xs" onClick={onEdit}>Edit</Button>
        <Button variant="light" color="red" size="xs" onClick={onDelete}>Delete</Button>
      </Group>
    </Card>
  );
};

export default ProductCard;