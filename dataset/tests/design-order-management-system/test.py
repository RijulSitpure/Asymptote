class OrderManagementSystem:
    def __init__(self):
        self.orders = {}
        self.total_value = 0
    
    def addOrder(self, order_id: int, price: int) -> None:
        if order_id in self.orders:
            self.total_value -= self.orders[order_id]
        self.orders[order_id] = price
        self.total_value += price
    
    def cancelOrder(self, order_id: int) -> None:
        if order_id in self.orders:
            self.total_value -= self.orders.pop(order_id)
    
    def getTotalOrderValue(self) -> int:
        return self.total_value

def run_tests():
    oms = OrderManagementSystem()
    assert oms.getTotalOrderValue() == 0
    oms.addOrder(1, 100)
    oms.addOrder(2, 250)
    assert oms.getTotalOrderValue() == 350
    oms.cancelOrder(1)
    assert oms.getTotalOrderValue() == 250
    print("All tests passed for 3822.")

if __name__ == "__main__":
    run_tests()
