class FindSumPairs:
    def __init__(self, nums1: list[int], nums2: list[int]):
        self.nums1 = nums1
        self.nums2 = nums2
        self.counts2 = {}
        for x in nums2:
            self.counts2[x] = self.counts2.get(x, 0) + 1

    def add(self, index: int, val: int) -> None:
        old = self.nums2[index]
        self.counts2[old] -= 1
        new_val = old + val
        self.nums2[index] = new_val
        self.counts2[new_val] = self.counts2.get(new_val, 0) + 1

    def count(self, tot: int) -> int:
        res = 0
        for x in self.nums1:
            target = tot - x
            res += self.counts2.get(target, 0)
        return res

def test_sum_pairs():
    fsp = FindSumPairs([1, 2, 3], [3, 4, 5, 6])
    assert fsp.count(7) == 3
    fsp.add(3, 2)
    assert fsp.count(7) == 2

