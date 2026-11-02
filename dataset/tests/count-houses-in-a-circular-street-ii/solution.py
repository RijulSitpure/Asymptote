class Solution:
    def houseCount(self, street: 'Street', k: int) -> int:
        while not street.isDoorOpen():
            street.moveRight()
        street.moveRight()
        ans = 0
        for count in range(1, k + 1):
            if street.isDoorOpen():
                ans = count
                street.closeDoor()
            street.moveRight()
        return ans
