def pancakeSort(arr: list[int]) -> list[int]:
    ans = []
    n = len(arr)
    a = list(arr)
    for target in range(n, 1, -1):
        idx = a.index(target)
        if idx == target - 1:
            continue
        if idx != 0:
            ans.append(idx + 1)
            a[:idx + 1] = reversed(a[:idx + 1])
        ans.append(target)
        a[:target] = reversed(a[:target])
    return ans