from collections import Counter

def numberOfPairs(nums1: list[int], nums2: list[int], queries: list[list[int]]) -> list[int]:
    n2 = nums2[:]
    ans = []
    freq = Counter(n2)
    for q in queries:
        if q[0] == 1:
            _, l, r, val = q
            for i in range(l, r + 1):
                old = n2[i]
                freq[old] -= 1
                n2[i] += val
                freq[n2[i]] += 1
        else:
            _, tot = q
            total_pairs = 0
            for x in nums1:
                target = tot - x
                total_pairs += freq[target]
            ans.append(total_pairs)
    return ans