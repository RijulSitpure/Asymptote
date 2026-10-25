from collections import Counter

class Solution:
    def findLeastNumOfUniqueInts(self, arr: list[int], k: int) -> int:
        counts = sorted(Counter(arr).values())
        unique_rem = len(counts)
        for count in counts:
            if k >= count:
                k -= count
                unique_rem -= 1
            else:
                break
        return unique_rem

def test():
    sol = Solution()
    assert sol.findLeastNumOfUniqueInts([5,5,4], 1) == 1, "test 1 failed"
    assert sol.findLeastNumOfUniqueInts([4,3,1,1,3,3,2], 3) == 2, "test 2 failed"
    print("✓ least-number-of-unique-integers-after-k-removals passed")

if __name__ == "__main__":
    test()
