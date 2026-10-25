class Solution:
    def minimumBoxes(self, n: int) -> int:
        curr = 0
        h = 0
        while curr + (h + 1) * (h + 2) // 2 <= n:
            h += 1
            curr += h * (h + 1) // 2

        floor_boxes = h * (h + 1) // 2
        rem = n - curr
        j = 0
        while rem > 0:
            j += 1
            rem -= j
            floor_boxes += 1
        return floor_boxes

def test():
    sol = Solution()
    assert sol.minimumBoxes(3) == 3
    assert sol.minimumBoxes(4) == 3
    assert sol.minimumBoxes(10) == 6

    print("✓ building-boxes passed")

if __name__ == '__main__':
    test()
