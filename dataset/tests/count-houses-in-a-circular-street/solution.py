class Solution:
    def houseCount(self, street: 'Street', k: int) -> int:
        for _ in range(k):
            street.openDoor()
            street.moveLeft()
        ans = 0
        while street.isDoorOpen():
            street.closeDoor()
            street.moveLeft()
            ans += 1
        return ans
