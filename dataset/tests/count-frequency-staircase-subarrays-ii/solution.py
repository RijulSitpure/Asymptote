def countStaircase(nums: list[int]) -> int:
    n = len(nums)
    ans = 0
    for i in range(n):
        order = []
        seen = {}
        freq = {}
        for j in range(i, n):
            x = nums[j]
            if x not in seen:
                seen[x] = len(order) + 1
                order.append(x)
            freq[x] = freq.get(x, 0) + 1
            k = len(order)
            req = k * (k + 1) // 2
            cur = j - i + 1
            if cur == req:
                if all(freq[v] == seen[v] for v in order):
                    ans += 1
            elif cur > req:
                break
    return ans
