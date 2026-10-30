from typing import List

class Solution:
    def amountPainted(self, paint: List[List[int]]) -> List[int]:
        jump = {}
        def find(x):
            if x not in jump:
                return x
            jump[x] = find(jump[x])
            return jump[x]
            
        ans = []
        for start, end in paint:
            cur = start
            work = 0
            while cur < end:
                next_cur = find(cur)
                if next_cur >= end:
                    break
                work += 1
                jump[next_cur] = find(next_cur + 1)
                cur = jump[next_cur]
            ans.append(work)
        return ans
