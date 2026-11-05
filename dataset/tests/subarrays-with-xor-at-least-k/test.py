from typing import List

class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        # Trie to count prefix XORs with XOR >= k
        trie = {}
        def insert(val: int):
            node = trie
            for i in range(30, -1, -1):
                bit = (val >> i) & 1
                if bit not in node:
                    node[bit] = {"cnt": 0}
                node = node[bit]
                node["cnt"] += 1

        def query(val: int, limit: int) -> int:
            node = trie
            ans = 0
            for i in range(30, -1, -1):
                if not node:
                    break
                v_bit = (val >> i) & 1
                k_bit = (limit >> i) & 1
                
                if k_bit == 0:
                    # If we take branch opposite to v_bit, XOR has 1 in this bit > 0, so all its children satisfy >= k
                    opp = 1 - v_bit
                    if opp in node:
                        ans += node[opp]["cnt"]
                    node = node.get(v_bit)
                else:
                    # If k_bit == 1, we must match opp branch to have 1 in this bit
                    opp = 1 - v_bit
                    node = node.get(opp)
            if node:
                ans += node["cnt"]
            return ans

        insert(0)
        curr = 0
        ans = 0
        for x in nums:
            curr ^= x
            ans += query(curr, k)
            insert(curr)
        return ans

def run_tests():
    s = Solution()
    res1 = s.countSubarrays([1, 2, 3], 2) # subarrays with xor >= 2: [2]->2, [3]->3, [1,2]->3 -> 3
    assert res1 == 3, f"Expected 3, got {res1}"
    res2 = s.countSubarrays([5, 1, 4], 4) # [5], [5,1]->4, [1,4]->5, [4] -> 4
    assert res2 == 4, f"Expected 4, got {res2}"
    print("3632 subarrays-with-xor-at-least-k PASSED")

if __name__ == "__main__":
    run_tests()
