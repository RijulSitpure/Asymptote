select
    sp.salesperson_id,
    sp.name,
    coalesce(sum(s.price), 0) as total
from Salesperson sp
left join Customer c on sp.salesperson_id = c.salesperson_id
left join Sales s on c.customer_id = s.customer_id
group by sp.salesperson_id, sp.name;