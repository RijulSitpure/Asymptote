def countSingleBlockIntegers(nums: list[int]) -> int:
    first = {}
    last = {}
    count = {}
    for i, x in enumerate(nums):
        if x not in first:
            first[x] = i
        last[x] = i
        count[x] = count.get(x, 0) + 1

    single_block_count = 0
    for x in count:
        if last[x] - first[x] + 1 == count[x]:
            single_block_count += 1
    return single_block_count