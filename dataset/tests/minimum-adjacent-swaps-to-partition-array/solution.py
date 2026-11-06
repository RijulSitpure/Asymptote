def minSwapsToPartition(nums: list[int]) -> int:
    swaps_0_first = 0
    ones_seen = 0
    for x in nums:
        if x == 1:
            ones_seen += 1
        else:
            swaps_0_first += ones_seen
    
    swaps_1_first = 0
    zeros_seen = 0
    for x in nums:
        if x == 0:
            zeros_seen += 1
        else:
            swaps_1_first += zeros_seen
            
    return min(swaps_0_first, swaps_1_first)