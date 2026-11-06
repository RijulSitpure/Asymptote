def maxProductPairWithSum(nums: list[int], target: int) -> int:
    seen = set()
    best_product = float('-inf')

    for x in nums:
        comp = target - x
        if comp in seen:
            best_product = max(best_product, x * comp)
        seen.add(x)

    return best_product if best_product != float('-inf') else -1