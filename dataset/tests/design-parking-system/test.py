class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        self.slots = [0, big, medium, small]

    def addCar(self, carType: int) -> bool:
        if self.slots[carType] > 0:
            self.slots[carType] -= 1
            return True
        return False

ps = ParkingSystem(1, 1, 0)
assert ps.addCar(1) == True
assert ps.addCar(1) == False
assert ps.addCar(2) == True
assert ps.addCar(3) == False
print("All tests passed successfully.")
