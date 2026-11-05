class Solution:
    def resultArray(self, nums: list[int]) -> list[int]:
        sorted_unique = sorted(set(nums))
        rank = {v: i + 1 for i, v in enumerate(sorted_unique)}
        m = len(sorted_unique)
        bit1 = [0] * (m + 2)
        bit2 = [0] * (m + 2)
        def add(bit, i):
            while i <= m:
                bit[i] += 1
                i += i & (-i)
        def query(bit, i):
            s = 0
            while i > 0:
                s += bit[i]
                i -= i & (-i)
            return s
        arr1 = [nums[0]]
        arr2 = [nums[1]]
        add(bit1, rank[nums[0]])
        add(bit2, rank[nums[1]])
        for x in nums[2:]:
            r = rank[x]
            g1 = len(arr1) - query(bit1, r)
            g2 = len(arr2) - query(bit2, r)
            if g1 > g2:
                arr1.append(x)
                add(bit1, r)
            elif g2 > g1:
                arr2.append(x)
                add(bit2, r)
            else:
                if len(arr1) <= len(arr2):
                    arr1.append(x)
                    add(bit1, r)
                else:
                    arr2.append(x)
                    add(bit2, r)
        return arr1 + arr2
