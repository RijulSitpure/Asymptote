from collections import Counter

def minSwapsToEqualize(nums1: list[int], nums2: list[int]) -> int:
    c1 = Counter(nums1)
    c2 = Counter(nums2)
    total = c1 + c2
    for k, v in total.items():
        if v % 2 != 0:
            return -1
    diff = 0
    for k, v in total.items():
        target = v // 2
        if c1[k] > target:
            diff += c1[k] - target
    return diff