def minOperations(nums: list[int], target: int) -> int:
    total = sum(nums)
    if total < target:
        return -1

    count = [0] * 32
    for x in nums:
        count[x.bit_length() - 1] += 1

    ops = 0
    i = 0
    while i < 31:
        if (target >> i) & 1:
            if count[i] > 0:
                count[i] -= 1
            else:
                j = i
                while j < 31 and count[j] == 0:
                    j += 1
                if j == 31:
                    return -1
                count[j] -= 1
                while j > i:
                    j -= 1
                    count[j] += 1
                    ops += 1
        count[i + 1] += count[i] // 2
        i += 1
    return ops