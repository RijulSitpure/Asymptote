def mergeAdjacent(nums: list[int]) -> list[int]:
    st = []
    for x in nums:
        cur = x
        while st and st[-1] == cur:
            cur += st.pop()
        st.append(cur)
    return st