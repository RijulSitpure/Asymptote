from collections import Counter

def maxMexArray(nums: list[int]) -> list[int]:
    n = len(nums)
    rem_counts = Counter(nums)
    res = []
    i = 0
    while i < n:
        mex = 0
        while rem_counts[mex] > 0:
            mex += 1
        if mex == 0:
            res.extend([0] * (n - i))
            break
        needed = set(range(mex))
        seen = set()
        j = i
        while j < n and needed:
            val = nums[j]
            rem_counts[val] -= 1
            if val in needed:
                seen.add(val)
                if len(seen) == mex:
                    j += 1
                    break
            j += 1
        res.append(mex)
        i = j
    return res