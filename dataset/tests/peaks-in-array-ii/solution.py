def countPeaks(nums: list[int], queries: list[list[int]]) -> list[int]:
    n = len(nums)
    bit = [0] * (n + 1)

    def add(idx: int, val: int) -> None:
        idx += 1
        while idx <= n:
            bit[idx] += val
            idx += idx & (-idx)

    def query(idx: int) -> int:
        idx += 1
        s = 0
        while idx > 0:
            s += bit[idx]
            idx -= idx & (-idx)
        return s

    def is_peak(i: int) -> int:
        if 0 < i < n - 1 and nums[i] > nums[i - 1] and nums[i] > nums[i + 1]:
            return 1
        return 0

    peak = [0] * n
    for i in range(1, n - 1):
        peak[i] = is_peak(i)
        if peak[i]:
            add(i, 1)

    res = []
    for q in queries:
        if q[0] == 1:
            l, r = q[1], q[2]
            if r - l < 2:
                res.append(0)
            else:
                res.append(query(r - 1) - query(l))
        else:
            idx, val = q[1], q[2]
            nums[idx] = val
            for i in range(max(1, idx - 1), min(n - 1, idx + 2)):
                new_p = is_peak(i)
                if new_p != peak[i]:
                    add(i, new_p - peak[i])
                    peak[i] = new_p
    return res