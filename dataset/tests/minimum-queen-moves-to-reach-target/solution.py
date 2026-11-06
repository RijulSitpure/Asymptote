def minQueenMoves(qr: int, qc: int, tr: int, tc: int, br: int, bc: int) -> int:
    if qr == tr and qc == tc:
        return 0

    def is_between(a: int, b: int, c: int) -> bool:
        return min(a, c) < b < max(a, c)

    # Check 1 move:
    # 1. Same row
    if qr == tr:
        if br == qr and is_between(qc, bc, tc):
            return 2
        return 1

    # 2. Same column
    if qc == tc:
        if bc == qc and is_between(qr, br, tr):
            return 2
        return 1

    # 3. Same diagonal
    if abs(qr - tr) == abs(qc - tc):
        if abs(qr - br) == abs(qc - bc) and abs(br - tr) == abs(bc - tc):
            if is_between(qr, br, tr) and is_between(qc, bc, tc):
                return 2
        return 1

    # Otherwise 2 moves always suffice
    return 2