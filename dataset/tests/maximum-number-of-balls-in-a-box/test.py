class Solution:
    def countBalls(self, lowLimit: int, highLimit: int) -> int:
        boxes = [0] * 50
        for num in range(lowLimit, highLimit + 1):
            s = 0
            n = num
            while n > 0:
                s += n % 10
                n //= 10
            boxes[s] += 1
        return max(boxes)

def test():
    sol = Solution()
    assert sol.countBalls(1, 10) == 2
    assert sol.countBalls(5, 15) == 2
    assert sol.countBalls(19, 28) == 2

    print("✓ maximum-number-of-balls-in-a-box passed")

if __name__ == '__main__':
    test()
