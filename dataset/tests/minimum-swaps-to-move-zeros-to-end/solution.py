def minSwaps(nums: list[int]) -> int:
    arr = nums[:]
    i = 0
    j = len(arr) - 1
    swaps = 0
    while i < j:
        while i < j and arr[i] != 0:
            i += 1
        while i < j and arr[j] == 0:
            j -= 1
        if i < j:
            arr[i], arr[j] = arr[j], arr[i]
            swaps += 1
            i += 1
            j -= 1
    return swaps