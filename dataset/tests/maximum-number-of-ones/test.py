class Solution:
    def maximumNumberOfOnes(self, width: int, height: int, sideLength: int, maxOnes: int) -> int:
        counts = []
        for r in range(sideLength):
            for c in range(sideLength):
                r_count = (height - 1 - r) // sideLength + 1
                c_count = (width - 1 - c) // sideLength + 1
                counts.append(r_count * c_count)
        counts.sort(reverse=True)
        return sum(counts[:maxOnes])

def test():
    sol = Solution()
    assert sol.maximumNumberOfOnes(3, 3, 2, 1) == 4, "test 1 failed"
    assert sol.maximumNumberOfOnes(3, 3, 2, 2) == 6, "test 2 failed"
    print("✓ maximum-number-of-ones passed")

if __name__ == "__main__":
    test()
