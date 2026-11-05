def countOppositeParity(nums: list[int]) -> list[int]:
    cnt = [0, 0]
    for x in nums:
        cnt[x % 2] += 1
    ans = []
    for x in nums:
        p = x % 2
        cnt[p] -= 1
        ans.append(cnt[1 - p])
    return ans