class Solution:
    def isCovered(self, ranges: list[list[int]], left: int, right: int) -> bool:
        diff = [0] * 52
        for l, r in ranges:
            diff[l] += 1
            diff[r + 1] -= 1

        curr = 0
        for i in range(1, 51):
            curr += diff[i]
            if left <= i <= right and curr <= 0:
                return False
        return True

def test():
    sol = Solution()
    assert sol.isCovered([[1,2],[3,4],[5,6]], 2, 5) is True
    assert sol.isCovered([[1,10],[10,20]], 21, 21) is False

if __name__ == '__main__':
    test()
