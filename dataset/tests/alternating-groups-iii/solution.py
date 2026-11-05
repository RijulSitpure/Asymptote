class Solution:
    def numberOfAlternatingGroups(self, colors: list[int], queries: list[list[int]]) -> list[int]:
        n = len(colors)
        ans = []
        for q in queries:
            if q[0] == 1:
                sz = q[1]
                # Count alternating groups of length sz
                # In circular array: colors[i..i+sz-1] alternating
                count = 0
                for start in range(n):
                    valid = True
                    for step in range(sz - 1):
                        if colors[(start + step) % n] == colors[(start + step + 1) % n]:
                            valid = False
                            break
                    if valid:
                        count += 1
                ans.append(count)
            else:
                colors[q[1]] = q[2]
        return ans
