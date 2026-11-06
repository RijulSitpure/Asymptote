def maxEqualAdjacentPairs(nums: list[int]) -> int:
    n = len(nums)
    if n <= 1:
        return 0

    base = sum(1 for i in range(n - 1) if nums[i] == nums[i + 1])
    max_gain = 0

    for i in range(n):
        # Current matches involving i
        old_matches = 0
        if i > 0 and nums[i] == nums[i - 1]:
            old_matches += 1
        if i < n - 1 and nums[i] == nums[i + 1]:
            old_matches += 1

        # Candidates to replace nums[i]: nums[i-1] or nums[i+1]
        cands = set()
        if i > 0:
            cands.add(nums[i - 1])
        if i < n - 1:
            cands.add(nums[i + 1])

        for cand in cands:
            new_matches = 0
            if i > 0 and cand == nums[i - 1]:
                new_matches += 1
            if i < n - 1 and cand == nums[i + 1]:
                new_matches += 1
            max_gain = max(max_gain, new_matches - old_matches)

    return base + max_gain