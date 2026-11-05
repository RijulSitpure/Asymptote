class Solution:
    def tripletCount(self, a: list[int], b: list[int], c: list[int]) -> int:
        def get_counts(arr):
            even = sum(1 for x in arr if x.bit_count() % 2 == 0)
            return even, len(arr) - even
            
        ea, oa = get_counts(a)
        eb, ob = get_counts(b)
        ec, oc = get_counts(c)
        
        return (ea * eb * ec) + (ea * ob * oc) + (oa * eb * oc) + (oa * ob * ec)