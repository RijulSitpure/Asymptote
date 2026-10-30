select
    student_id,
    department_id,
    round(
        coalesce(
            (rank() over (partition by department_id order by mark desc) - 1) * 100.0 /
            nullif(count(*) over (partition by department_id) - 1, 0),
            0
        ),
        2
    ) as percentage
from Students;