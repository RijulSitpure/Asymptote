from functools import cmp_to_key

def maxConcatenatedValue(segments: list[str]) -> int:
    MOD = 1_000_000_007
    def compare(a: str, b: str) -> int:
        if a + b > b + a:
            return -1
        elif a + b < b + a:
            return 1
        return 0

    sorted_segs = sorted(segments, key=cmp_to_key(compare))
    val = 0
    for seg in sorted_segs:
        for bit in seg:
            val = ((val << 1) | int(bit)) % MOD
    return val