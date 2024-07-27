import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','phone','role','createdAt','updatedAt']);

export const ServiceScalarFieldEnumSchema = z.enum(['id','name','description','duration','price','createdAt','updatedAt']);

export const ServiceAvailabilityScalarFieldEnumSchema = z.enum(['id','serviceId','timesPerHour','dayOfWeek','startHour','endHour','createdAt','updatedAt']);

export const AppointmentScalarFieldEnumSchema = z.enum(['id','date','startTime','endTime','status','createdAt','updatedAt','userId','serviceId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const RoleSchema = z.enum(['ADMIN','STAFF','CLIENT']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const AppointmentStatusSchema = z.enum(['SCHEDULED','CONFIRMED','CANCELED','COMPLETED']);

export type AppointmentStatusType = `${z.infer<typeof AppointmentStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().uuid(),
  email: z.string().nullable(),
  name: z.string(),
  phone: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SERVICE SCHEMA
/////////////////////////////////////////

export const ServiceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  duration: z.number().int(),
  price: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Service = z.infer<typeof ServiceSchema>

/////////////////////////////////////////
// SERVICE AVAILABILITY SCHEMA
/////////////////////////////////////////

export const ServiceAvailabilitySchema = z.object({
  id: z.string().uuid(),
  serviceId: z.string(),
  timesPerHour: z.number().int(),
  dayOfWeek: z.number().int().array(),
  startHour: z.string(),
  endHour: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ServiceAvailability = z.infer<typeof ServiceAvailabilitySchema>

/////////////////////////////////////////
// APPOINTMENT SCHEMA
/////////////////////////////////////////

export const AppointmentSchema = z.object({
  status: AppointmentStatusSchema,
  id: z.string().uuid(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
  serviceId: z.string(),
})

export type Appointment = z.infer<typeof AppointmentSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  appointments: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  phone: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SERVICE
//------------------------------------------------------

export const ServiceIncludeSchema: z.ZodType<Prisma.ServiceInclude> = z.object({
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  availableTimes: z.union([z.boolean(),z.lazy(() => ServiceAvailabilityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ServiceArgsSchema: z.ZodType<Prisma.ServiceDefaultArgs> = z.object({
  select: z.lazy(() => ServiceSelectSchema).optional(),
  include: z.lazy(() => ServiceIncludeSchema).optional(),
}).strict();

export const ServiceCountOutputTypeArgsSchema: z.ZodType<Prisma.ServiceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ServiceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ServiceCountOutputTypeSelectSchema: z.ZodType<Prisma.ServiceCountOutputTypeSelect> = z.object({
  appointments: z.boolean().optional(),
  availableTimes: z.boolean().optional(),
}).strict();

export const ServiceSelectSchema: z.ZodType<Prisma.ServiceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  duration: z.boolean().optional(),
  price: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  appointments: z.union([z.boolean(),z.lazy(() => AppointmentFindManyArgsSchema)]).optional(),
  availableTimes: z.union([z.boolean(),z.lazy(() => ServiceAvailabilityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ServiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SERVICE AVAILABILITY
//------------------------------------------------------

export const ServiceAvailabilityIncludeSchema: z.ZodType<Prisma.ServiceAvailabilityInclude> = z.object({
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()

export const ServiceAvailabilityArgsSchema: z.ZodType<Prisma.ServiceAvailabilityDefaultArgs> = z.object({
  select: z.lazy(() => ServiceAvailabilitySelectSchema).optional(),
  include: z.lazy(() => ServiceAvailabilityIncludeSchema).optional(),
}).strict();

export const ServiceAvailabilitySelectSchema: z.ZodType<Prisma.ServiceAvailabilitySelect> = z.object({
  id: z.boolean().optional(),
  serviceId: z.boolean().optional(),
  timesPerHour: z.boolean().optional(),
  dayOfWeek: z.boolean().optional(),
  startHour: z.boolean().optional(),
  endHour: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()

// APPOINTMENT
//------------------------------------------------------

export const AppointmentIncludeSchema: z.ZodType<Prisma.AppointmentInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()

export const AppointmentArgsSchema: z.ZodType<Prisma.AppointmentDefaultArgs> = z.object({
  select: z.lazy(() => AppointmentSelectSchema).optional(),
  include: z.lazy(() => AppointmentIncludeSchema).optional(),
}).strict();

export const AppointmentSelectSchema: z.ZodType<Prisma.AppointmentSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  serviceId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  service: z.union([z.boolean(),z.lazy(() => ServiceArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appointments: z.lazy(() => AppointmentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string(),
    phone: z.string()
  }),
  z.object({
    id: z.string().uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    phone: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
    phone: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    phone: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ServiceWhereInputSchema: z.ZodType<Prisma.ServiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityListRelationFilterSchema).optional()
}).strict();

export const ServiceOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  appointments: z.lazy(() => AppointmentOrderByRelationAggregateInputSchema).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ServiceWhereUniqueInputSchema: z.ZodType<Prisma.ServiceWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceWhereInputSchema),z.lazy(() => ServiceWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  appointments: z.lazy(() => AppointmentListRelationFilterSchema).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityListRelationFilterSchema).optional()
}).strict());

export const ServiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceSumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  duration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ServiceAvailabilityWhereInputSchema: z.ZodType<Prisma.ServiceAvailabilityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceAvailabilityWhereInputSchema),z.lazy(() => ServiceAvailabilityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceAvailabilityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceAvailabilityWhereInputSchema),z.lazy(() => ServiceAvailabilityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timesPerHour: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  dayOfWeek: z.lazy(() => IntNullableListFilterSchema).optional(),
  startHour: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endHour: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
}).strict();

export const ServiceAvailabilityOrderByWithRelationInputSchema: z.ZodType<Prisma.ServiceAvailabilityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  timesPerHour: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  service: z.lazy(() => ServiceOrderByWithRelationInputSchema).optional()
}).strict();

export const ServiceAvailabilityWhereUniqueInputSchema: z.ZodType<Prisma.ServiceAvailabilityWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    serviceId_dayOfWeek: z.lazy(() => ServiceAvailabilityServiceIdDayOfWeekCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    serviceId_dayOfWeek: z.lazy(() => ServiceAvailabilityServiceIdDayOfWeekCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  serviceId_dayOfWeek: z.lazy(() => ServiceAvailabilityServiceIdDayOfWeekCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => ServiceAvailabilityWhereInputSchema),z.lazy(() => ServiceAvailabilityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceAvailabilityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceAvailabilityWhereInputSchema),z.lazy(() => ServiceAvailabilityWhereInputSchema).array() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timesPerHour: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  dayOfWeek: z.lazy(() => IntNullableListFilterSchema).optional(),
  startHour: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endHour: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
}).strict());

export const ServiceAvailabilityOrderByWithAggregationInputSchema: z.ZodType<Prisma.ServiceAvailabilityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  timesPerHour: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ServiceAvailabilityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ServiceAvailabilityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ServiceAvailabilityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ServiceAvailabilityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ServiceAvailabilitySumOrderByAggregateInputSchema).optional()
}).strict();

export const ServiceAvailabilityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ServiceAvailabilityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceAvailabilityScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceAvailabilityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceAvailabilityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceAvailabilityScalarWhereWithAggregatesInputSchema),z.lazy(() => ServiceAvailabilityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  timesPerHour: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  dayOfWeek: z.lazy(() => IntNullableListFilterSchema).optional(),
  startHour: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  endHour: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AppointmentWhereInputSchema: z.ZodType<Prisma.AppointmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endTime: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumAppointmentStatusFilterSchema),z.lazy(() => AppointmentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
}).strict();

export const AppointmentOrderByWithRelationInputSchema: z.ZodType<Prisma.AppointmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  service: z.lazy(() => ServiceOrderByWithRelationInputSchema).optional()
}).strict();

export const AppointmentWhereUniqueInputSchema: z.ZodType<Prisma.AppointmentWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentWhereInputSchema),z.lazy(() => AppointmentWhereInputSchema).array() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endTime: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumAppointmentStatusFilterSchema),z.lazy(() => AppointmentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  service: z.union([ z.lazy(() => ServiceRelationFilterSchema),z.lazy(() => ServiceWhereInputSchema) ]).optional(),
}).strict());

export const AppointmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AppointmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AppointmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AppointmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AppointmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const AppointmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AppointmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema),z.lazy(() => AppointmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  endTime: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumAppointmentStatusWithAggregatesFilterSchema),z.lazy(() => AppointmentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string(),
  phone: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string(),
  phone: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string(),
  phone: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceCreateInputSchema: z.ZodType<Prisma.ServiceCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  duration: z.number().int(),
  price: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutServiceInputSchema).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  duration: z.number().int(),
  price: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutServiceInputSchema).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUpdateInputSchema: z.ZodType<Prisma.ServiceUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutServiceNestedInputSchema).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutServiceNestedInputSchema).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceCreateManyInputSchema: z.ZodType<Prisma.ServiceCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  duration: z.number().int(),
  price: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ServiceUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceAvailabilityCreateInputSchema: z.ZodType<Prisma.ServiceAvailabilityCreateInput> = z.object({
  id: z.string().uuid().optional(),
  timesPerHour: z.number().int(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityCreatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.string().optional(),
  endHour: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutAvailableTimesInputSchema)
}).strict();

export const ServiceAvailabilityUncheckedCreateInputSchema: z.ZodType<Prisma.ServiceAvailabilityUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  serviceId: z.string(),
  timesPerHour: z.number().int(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityCreatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.string().optional(),
  endHour: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ServiceAvailabilityUpdateInputSchema: z.ZodType<Prisma.ServiceAvailabilityUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timesPerHour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityUpdatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutAvailableTimesNestedInputSchema).optional()
}).strict();

export const ServiceAvailabilityUncheckedUpdateInputSchema: z.ZodType<Prisma.ServiceAvailabilityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timesPerHour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityUpdatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceAvailabilityCreateManyInputSchema: z.ZodType<Prisma.ServiceAvailabilityCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  serviceId: z.string(),
  timesPerHour: z.number().int(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityCreatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.string().optional(),
  endHour: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ServiceAvailabilityUpdateManyMutationInputSchema: z.ZodType<Prisma.ServiceAvailabilityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timesPerHour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityUpdatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceAvailabilityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ServiceAvailabilityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timesPerHour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityUpdatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentCreateInputSchema: z.ZodType<Prisma.AppointmentCreateInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppointmentsInputSchema),
  service: z.lazy(() => ServiceCreateNestedOneWithoutAppointmentsInputSchema)
}).strict();

export const AppointmentUncheckedCreateInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  serviceId: z.string()
}).strict();

export const AppointmentUpdateInputSchema: z.ZodType<Prisma.AppointmentUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAppointmentsNestedInputSchema).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentCreateManyInputSchema: z.ZodType<Prisma.AppointmentCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  serviceId: z.string()
}).strict();

export const AppointmentUpdateManyMutationInputSchema: z.ZodType<Prisma.AppointmentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const AppointmentListRelationFilterSchema: z.ZodType<Prisma.AppointmentListRelationFilter> = z.object({
  every: z.lazy(() => AppointmentWhereInputSchema).optional(),
  some: z.lazy(() => AppointmentWhereInputSchema).optional(),
  none: z.lazy(() => AppointmentWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AppointmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AppointmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const ServiceAvailabilityListRelationFilterSchema: z.ZodType<Prisma.ServiceAvailabilityListRelationFilter> = z.object({
  every: z.lazy(() => ServiceAvailabilityWhereInputSchema).optional(),
  some: z.lazy(() => ServiceAvailabilityWhereInputSchema).optional(),
  none: z.lazy(() => ServiceAvailabilityWhereInputSchema).optional()
}).strict();

export const ServiceAvailabilityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ServiceAvailabilityOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvgOrderByAggregateInput> = z.object({
  duration: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceSumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceSumOrderByAggregateInput> = z.object({
  duration: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const IntNullableListFilterSchema: z.ZodType<Prisma.IntNullableListFilter> = z.object({
  equals: z.number().array().optional().nullable(),
  has: z.number().optional().nullable(),
  hasEvery: z.number().array().optional(),
  hasSome: z.number().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const ServiceRelationFilterSchema: z.ZodType<Prisma.ServiceRelationFilter> = z.object({
  is: z.lazy(() => ServiceWhereInputSchema).optional(),
  isNot: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ServiceAvailabilityServiceIdDayOfWeekCompoundUniqueInputSchema: z.ZodType<Prisma.ServiceAvailabilityServiceIdDayOfWeekCompoundUniqueInput> = z.object({
  serviceId: z.string(),
  dayOfWeek: z.number().array()
}).strict();

export const ServiceAvailabilityCountOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvailabilityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  timesPerHour: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvailabilityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvailabilityAvgOrderByAggregateInput> = z.object({
  timesPerHour: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvailabilityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvailabilityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  timesPerHour: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvailabilityMinOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvailabilityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional(),
  timesPerHour: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ServiceAvailabilitySumOrderByAggregateInputSchema: z.ZodType<Prisma.ServiceAvailabilitySumOrderByAggregateInput> = z.object({
  timesPerHour: z.lazy(() => SortOrderSchema).optional(),
  dayOfWeek: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAppointmentStatusFilterSchema: z.ZodType<Prisma.EnumAppointmentStatusFilter> = z.object({
  equals: z.lazy(() => AppointmentStatusSchema).optional(),
  in: z.lazy(() => AppointmentStatusSchema).array().optional(),
  notIn: z.lazy(() => AppointmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => NestedEnumAppointmentStatusFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AppointmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AppointmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AppointmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  serviceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumAppointmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAppointmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AppointmentStatusSchema).optional(),
  in: z.lazy(() => AppointmentStatusSchema).array().optional(),
  notIn: z.lazy(() => AppointmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => NestedEnumAppointmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional()
}).strict();

export const AppointmentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AppointmentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutUserInputSchema),z.lazy(() => AppointmentCreateWithoutUserInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutUserInputSchema),z.lazy(() => AppointmentCreateWithoutUserInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const AppointmentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutUserInputSchema),z.lazy(() => AppointmentCreateWithoutUserInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutUserInputSchema),z.lazy(() => AppointmentCreateWithoutUserInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutUserInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppointmentCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutServiceInputSchema),z.lazy(() => AppointmentCreateWithoutServiceInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutServiceInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceAvailabilityCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema).array(),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceAvailabilityCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutServiceInputSchema),z.lazy(() => AppointmentCreateWithoutServiceInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutServiceInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ServiceAvailabilityUncheckedCreateNestedManyWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityUncheckedCreateNestedManyWithoutServiceInput> = z.object({
  create: z.union([ z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema).array(),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceAvailabilityCreateManyServiceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const AppointmentUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutServiceInputSchema),z.lazy(() => AppointmentCreateWithoutServiceInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutServiceInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceAvailabilityUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.ServiceAvailabilityUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema).array(),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceAvailabilityUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceAvailabilityCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceAvailabilityUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceAvailabilityUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceAvailabilityScalarWhereInputSchema),z.lazy(() => ServiceAvailabilityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => AppointmentCreateWithoutServiceInputSchema),z.lazy(() => AppointmentCreateWithoutServiceInputSchema).array(),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AppointmentCreateOrConnectWithoutServiceInputSchema),z.lazy(() => AppointmentCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => AppointmentUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AppointmentCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AppointmentWhereUniqueInputSchema),z.lazy(() => AppointmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => AppointmentUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AppointmentUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => AppointmentUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceAvailabilityUncheckedUpdateManyWithoutServiceNestedInputSchema: z.ZodType<Prisma.ServiceAvailabilityUncheckedUpdateManyWithoutServiceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema).array(),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ServiceAvailabilityUpsertWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUpsertWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ServiceAvailabilityCreateManyServiceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ServiceAvailabilityUpdateWithWhereUniqueWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUpdateWithWhereUniqueWithoutServiceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ServiceAvailabilityUpdateManyWithWhereWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUpdateManyWithWhereWithoutServiceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ServiceAvailabilityScalarWhereInputSchema),z.lazy(() => ServiceAvailabilityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ServiceAvailabilityCreatedayOfWeekInputSchema: z.ZodType<Prisma.ServiceAvailabilityCreatedayOfWeekInput> = z.object({
  set: z.number().array()
}).strict();

export const ServiceCreateNestedOneWithoutAvailableTimesInputSchema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutAvailableTimesInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutAvailableTimesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAvailableTimesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutAvailableTimesInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional()
}).strict();

export const ServiceAvailabilityUpdatedayOfWeekInputSchema: z.ZodType<Prisma.ServiceAvailabilityUpdatedayOfWeekInput> = z.object({
  set: z.number().array().optional(),
  push: z.union([ z.number(),z.number().array() ]).optional(),
}).strict();

export const ServiceUpdateOneRequiredWithoutAvailableTimesNestedInputSchema: z.ZodType<Prisma.ServiceUpdateOneRequiredWithoutAvailableTimesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutAvailableTimesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAvailableTimesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutAvailableTimesInputSchema).optional(),
  upsert: z.lazy(() => ServiceUpsertWithoutAvailableTimesInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateToOneWithWhereWithoutAvailableTimesInputSchema),z.lazy(() => ServiceUpdateWithoutAvailableTimesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutAvailableTimesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAppointmentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppointmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ServiceCreateNestedOneWithoutAppointmentsInputSchema: z.ZodType<Prisma.ServiceCreateNestedOneWithoutAppointmentsInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutAppointmentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional()
}).strict();

export const EnumAppointmentStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAppointmentStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AppointmentStatusSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAppointmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAppointmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAppointmentsInputSchema),z.lazy(() => UserUpdateWithoutAppointmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppointmentsInputSchema) ]).optional(),
}).strict();

export const ServiceUpdateOneRequiredWithoutAppointmentsNestedInputSchema: z.ZodType<Prisma.ServiceUpdateOneRequiredWithoutAppointmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ServiceCreateWithoutAppointmentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAppointmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ServiceCreateOrConnectWithoutAppointmentsInputSchema).optional(),
  upsert: z.lazy(() => ServiceUpsertWithoutAppointmentsInputSchema).optional(),
  connect: z.lazy(() => ServiceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ServiceUpdateToOneWithWhereWithoutAppointmentsInputSchema),z.lazy(() => ServiceUpdateWithoutAppointmentsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutAppointmentsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumAppointmentStatusFilterSchema: z.ZodType<Prisma.NestedEnumAppointmentStatusFilter> = z.object({
  equals: z.lazy(() => AppointmentStatusSchema).optional(),
  in: z.lazy(() => AppointmentStatusSchema).array().optional(),
  notIn: z.lazy(() => AppointmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => NestedEnumAppointmentStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumAppointmentStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAppointmentStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AppointmentStatusSchema).optional(),
  in: z.lazy(() => AppointmentStatusSchema).array().optional(),
  notIn: z.lazy(() => AppointmentStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => NestedEnumAppointmentStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAppointmentStatusFilterSchema).optional()
}).strict();

export const AppointmentCreateWithoutUserInputSchema: z.ZodType<Prisma.AppointmentCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  service: z.lazy(() => ServiceCreateNestedOneWithoutAppointmentsInputSchema)
}).strict();

export const AppointmentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  serviceId: z.string()
}).strict();

export const AppointmentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AppointmentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutUserInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AppointmentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AppointmentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppointmentCreateManyUserInputSchema),z.lazy(() => AppointmentCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppointmentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppointmentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppointmentUpdateWithoutUserInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutUserInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AppointmentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AppointmentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateWithoutUserInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AppointmentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AppointmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateManyMutationInputSchema),z.lazy(() => AppointmentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AppointmentScalarWhereInputSchema: z.ZodType<Prisma.AppointmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AppointmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AppointmentScalarWhereInputSchema),z.lazy(() => AppointmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  startTime: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endTime: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumAppointmentStatusFilterSchema),z.lazy(() => AppointmentStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const AppointmentCreateWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentCreateWithoutServiceInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAppointmentsInputSchema)
}).strict();

export const AppointmentUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentUncheckedCreateWithoutServiceInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const AppointmentCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutServiceInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const AppointmentCreateManyServiceInputEnvelopeSchema: z.ZodType<Prisma.AppointmentCreateManyServiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AppointmentCreateManyServiceInputSchema),z.lazy(() => AppointmentCreateManyServiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ServiceAvailabilityCreateWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityCreateWithoutServiceInput> = z.object({
  id: z.string().uuid().optional(),
  timesPerHour: z.number().int(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityCreatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.string().optional(),
  endHour: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityUncheckedCreateWithoutServiceInput> = z.object({
  id: z.string().uuid().optional(),
  timesPerHour: z.number().int(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityCreatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.string().optional(),
  endHour: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ServiceAvailabilityCreateOrConnectWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityCreateOrConnectWithoutServiceInput> = z.object({
  where: z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const ServiceAvailabilityCreateManyServiceInputEnvelopeSchema: z.ZodType<Prisma.ServiceAvailabilityCreateManyServiceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ServiceAvailabilityCreateManyServiceInputSchema),z.lazy(() => ServiceAvailabilityCreateManyServiceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AppointmentUpsertWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentUpsertWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AppointmentUpdateWithoutServiceInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutServiceInputSchema) ]),
  create: z.union([ z.lazy(() => AppointmentCreateWithoutServiceInputSchema),z.lazy(() => AppointmentUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const AppointmentUpdateWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentUpdateWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => AppointmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateWithoutServiceInputSchema),z.lazy(() => AppointmentUncheckedUpdateWithoutServiceInputSchema) ]),
}).strict();

export const AppointmentUpdateManyWithWhereWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentUpdateManyWithWhereWithoutServiceInput> = z.object({
  where: z.lazy(() => AppointmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AppointmentUpdateManyMutationInputSchema),z.lazy(() => AppointmentUncheckedUpdateManyWithoutServiceInputSchema) ]),
}).strict();

export const ServiceAvailabilityUpsertWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityUpsertWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ServiceAvailabilityUpdateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUncheckedUpdateWithoutServiceInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceAvailabilityCreateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUncheckedCreateWithoutServiceInputSchema) ]),
}).strict();

export const ServiceAvailabilityUpdateWithWhereUniqueWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityUpdateWithWhereUniqueWithoutServiceInput> = z.object({
  where: z.lazy(() => ServiceAvailabilityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ServiceAvailabilityUpdateWithoutServiceInputSchema),z.lazy(() => ServiceAvailabilityUncheckedUpdateWithoutServiceInputSchema) ]),
}).strict();

export const ServiceAvailabilityUpdateManyWithWhereWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityUpdateManyWithWhereWithoutServiceInput> = z.object({
  where: z.lazy(() => ServiceAvailabilityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ServiceAvailabilityUpdateManyMutationInputSchema),z.lazy(() => ServiceAvailabilityUncheckedUpdateManyWithoutServiceInputSchema) ]),
}).strict();

export const ServiceAvailabilityScalarWhereInputSchema: z.ZodType<Prisma.ServiceAvailabilityScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ServiceAvailabilityScalarWhereInputSchema),z.lazy(() => ServiceAvailabilityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ServiceAvailabilityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ServiceAvailabilityScalarWhereInputSchema),z.lazy(() => ServiceAvailabilityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  serviceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  timesPerHour: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  dayOfWeek: z.lazy(() => IntNullableListFilterSchema).optional(),
  startHour: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  endHour: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ServiceCreateWithoutAvailableTimesInputSchema: z.ZodType<Prisma.ServiceCreateWithoutAvailableTimesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  duration: z.number().int(),
  price: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appointments: z.lazy(() => AppointmentCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateWithoutAvailableTimesInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutAvailableTimesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  duration: z.number().int(),
  price: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  appointments: z.lazy(() => AppointmentUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceCreateOrConnectWithoutAvailableTimesInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutAvailableTimesInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutAvailableTimesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAvailableTimesInputSchema) ]),
}).strict();

export const ServiceUpsertWithoutAvailableTimesInputSchema: z.ZodType<Prisma.ServiceUpsertWithoutAvailableTimesInput> = z.object({
  update: z.union([ z.lazy(() => ServiceUpdateWithoutAvailableTimesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutAvailableTimesInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutAvailableTimesInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAvailableTimesInputSchema) ]),
  where: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ServiceUpdateToOneWithWhereWithoutAvailableTimesInputSchema: z.ZodType<Prisma.ServiceUpdateToOneWithWhereWithoutAvailableTimesInput> = z.object({
  where: z.lazy(() => ServiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutAvailableTimesInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutAvailableTimesInputSchema) ]),
}).strict();

export const ServiceUpdateWithoutAvailableTimesInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutAvailableTimesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutAvailableTimesInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutAvailableTimesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  appointments: z.lazy(() => AppointmentUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.UserCreateWithoutAppointmentsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string(),
  phone: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAppointmentsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional().nullable(),
  name: z.string(),
  phone: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAppointmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppointmentsInputSchema) ]),
}).strict();

export const ServiceCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.ServiceCreateWithoutAppointmentsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  duration: z.number().int(),
  price: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceUncheckedCreateWithoutAppointmentsInputSchema: z.ZodType<Prisma.ServiceUncheckedCreateWithoutAppointmentsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  duration: z.number().int(),
  price: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityUncheckedCreateNestedManyWithoutServiceInputSchema).optional()
}).strict();

export const ServiceCreateOrConnectWithoutAppointmentsInputSchema: z.ZodType<Prisma.ServiceCreateOrConnectWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => ServiceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ServiceCreateWithoutAppointmentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAppointmentsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAppointmentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAppointmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppointmentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAppointmentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAppointmentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAppointmentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAppointmentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceUpsertWithoutAppointmentsInputSchema: z.ZodType<Prisma.ServiceUpsertWithoutAppointmentsInput> = z.object({
  update: z.union([ z.lazy(() => ServiceUpdateWithoutAppointmentsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutAppointmentsInputSchema) ]),
  create: z.union([ z.lazy(() => ServiceCreateWithoutAppointmentsInputSchema),z.lazy(() => ServiceUncheckedCreateWithoutAppointmentsInputSchema) ]),
  where: z.lazy(() => ServiceWhereInputSchema).optional()
}).strict();

export const ServiceUpdateToOneWithWhereWithoutAppointmentsInputSchema: z.ZodType<Prisma.ServiceUpdateToOneWithWhereWithoutAppointmentsInput> = z.object({
  where: z.lazy(() => ServiceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ServiceUpdateWithoutAppointmentsInputSchema),z.lazy(() => ServiceUncheckedUpdateWithoutAppointmentsInputSchema) ]),
}).strict();

export const ServiceUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.ServiceUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const ServiceUncheckedUpdateWithoutAppointmentsInputSchema: z.ZodType<Prisma.ServiceUncheckedUpdateWithoutAppointmentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  availableTimes: z.lazy(() => ServiceAvailabilityUncheckedUpdateManyWithoutServiceNestedInputSchema).optional()
}).strict();

export const AppointmentCreateManyUserInputSchema: z.ZodType<Prisma.AppointmentCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  serviceId: z.string()
}).strict();

export const AppointmentUpdateWithoutUserInputSchema: z.ZodType<Prisma.AppointmentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  service: z.lazy(() => ServiceUpdateOneRequiredWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentCreateManyServiceInputSchema: z.ZodType<Prisma.AppointmentCreateManyServiceInput> = z.object({
  id: z.string().uuid().optional(),
  date: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.lazy(() => AppointmentStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const ServiceAvailabilityCreateManyServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityCreateManyServiceInput> = z.object({
  id: z.string().uuid().optional(),
  timesPerHour: z.number().int(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityCreatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.string().optional(),
  endHour: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AppointmentUpdateWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentUpdateWithoutServiceInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAppointmentsNestedInputSchema).optional()
}).strict();

export const AppointmentUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateWithoutServiceInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AppointmentUncheckedUpdateManyWithoutServiceInputSchema: z.ZodType<Prisma.AppointmentUncheckedUpdateManyWithoutServiceInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => AppointmentStatusSchema),z.lazy(() => EnumAppointmentStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceAvailabilityUpdateWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityUpdateWithoutServiceInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timesPerHour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityUpdatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceAvailabilityUncheckedUpdateWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityUncheckedUpdateWithoutServiceInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timesPerHour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityUpdatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ServiceAvailabilityUncheckedUpdateManyWithoutServiceInputSchema: z.ZodType<Prisma.ServiceAvailabilityUncheckedUpdateManyWithoutServiceInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timesPerHour: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  dayOfWeek: z.union([ z.lazy(() => ServiceAvailabilityUpdatedayOfWeekInputSchema),z.number().int().array() ]).optional(),
  startHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  endHour: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindFirstArgsSchema: z.ZodType<Prisma.ServiceFindFirstArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindFirstOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceFindManyArgsSchema: z.ZodType<Prisma.ServiceFindManyArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceScalarFieldEnumSchema,ServiceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceAggregateArgsSchema: z.ZodType<Prisma.ServiceAggregateArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithRelationInputSchema.array(),ServiceOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceGroupByArgsSchema: z.ZodType<Prisma.ServiceGroupByArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
  orderBy: z.union([ ServiceOrderByWithAggregationInputSchema.array(),ServiceOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceScalarFieldEnumSchema.array(),
  having: ServiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceFindUniqueArgsSchema: z.ZodType<Prisma.ServiceFindUniqueArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceFindUniqueOrThrowArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceAvailabilityFindFirstArgsSchema: z.ZodType<Prisma.ServiceAvailabilityFindFirstArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  where: ServiceAvailabilityWhereInputSchema.optional(),
  orderBy: z.union([ ServiceAvailabilityOrderByWithRelationInputSchema.array(),ServiceAvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceAvailabilityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceAvailabilityScalarFieldEnumSchema,ServiceAvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceAvailabilityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ServiceAvailabilityFindFirstOrThrowArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  where: ServiceAvailabilityWhereInputSchema.optional(),
  orderBy: z.union([ ServiceAvailabilityOrderByWithRelationInputSchema.array(),ServiceAvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceAvailabilityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceAvailabilityScalarFieldEnumSchema,ServiceAvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceAvailabilityFindManyArgsSchema: z.ZodType<Prisma.ServiceAvailabilityFindManyArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  where: ServiceAvailabilityWhereInputSchema.optional(),
  orderBy: z.union([ ServiceAvailabilityOrderByWithRelationInputSchema.array(),ServiceAvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceAvailabilityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ServiceAvailabilityScalarFieldEnumSchema,ServiceAvailabilityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ServiceAvailabilityAggregateArgsSchema: z.ZodType<Prisma.ServiceAvailabilityAggregateArgs> = z.object({
  where: ServiceAvailabilityWhereInputSchema.optional(),
  orderBy: z.union([ ServiceAvailabilityOrderByWithRelationInputSchema.array(),ServiceAvailabilityOrderByWithRelationInputSchema ]).optional(),
  cursor: ServiceAvailabilityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceAvailabilityGroupByArgsSchema: z.ZodType<Prisma.ServiceAvailabilityGroupByArgs> = z.object({
  where: ServiceAvailabilityWhereInputSchema.optional(),
  orderBy: z.union([ ServiceAvailabilityOrderByWithAggregationInputSchema.array(),ServiceAvailabilityOrderByWithAggregationInputSchema ]).optional(),
  by: ServiceAvailabilityScalarFieldEnumSchema.array(),
  having: ServiceAvailabilityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ServiceAvailabilityFindUniqueArgsSchema: z.ZodType<Prisma.ServiceAvailabilityFindUniqueArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  where: ServiceAvailabilityWhereUniqueInputSchema,
}).strict() ;

export const ServiceAvailabilityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ServiceAvailabilityFindUniqueOrThrowArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  where: ServiceAvailabilityWhereUniqueInputSchema,
}).strict() ;

export const AppointmentFindFirstArgsSchema: z.ZodType<Prisma.AppointmentFindFirstArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AppointmentFindFirstOrThrowArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentFindManyArgsSchema: z.ZodType<Prisma.AppointmentFindManyArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AppointmentScalarFieldEnumSchema,AppointmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AppointmentAggregateArgsSchema: z.ZodType<Prisma.AppointmentAggregateArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithRelationInputSchema.array(),AppointmentOrderByWithRelationInputSchema ]).optional(),
  cursor: AppointmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AppointmentGroupByArgsSchema: z.ZodType<Prisma.AppointmentGroupByArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
  orderBy: z.union([ AppointmentOrderByWithAggregationInputSchema.array(),AppointmentOrderByWithAggregationInputSchema ]).optional(),
  by: AppointmentScalarFieldEnumSchema.array(),
  having: AppointmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AppointmentFindUniqueArgsSchema: z.ZodType<Prisma.AppointmentFindUniqueArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AppointmentFindUniqueOrThrowArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const ServiceCreateArgsSchema: z.ZodType<Prisma.ServiceCreateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
}).strict() ;

export const ServiceUpsertArgsSchema: z.ZodType<Prisma.ServiceUpsertArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
  create: z.union([ ServiceCreateInputSchema,ServiceUncheckedCreateInputSchema ]),
  update: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
}).strict() ;

export const ServiceCreateManyArgsSchema: z.ZodType<Prisma.ServiceCreateManyArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ServiceCreateManyAndReturnArgs> = z.object({
  data: z.union([ ServiceCreateManyInputSchema,ServiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceDeleteArgsSchema: z.ZodType<Prisma.ServiceDeleteArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateArgsSchema: z.ZodType<Prisma.ServiceUpdateArgs> = z.object({
  select: ServiceSelectSchema.optional(),
  include: ServiceIncludeSchema.optional(),
  data: z.union([ ServiceUpdateInputSchema,ServiceUncheckedUpdateInputSchema ]),
  where: ServiceWhereUniqueInputSchema,
}).strict() ;

export const ServiceUpdateManyArgsSchema: z.ZodType<Prisma.ServiceUpdateManyArgs> = z.object({
  data: z.union([ ServiceUpdateManyMutationInputSchema,ServiceUncheckedUpdateManyInputSchema ]),
  where: ServiceWhereInputSchema.optional(),
}).strict() ;

export const ServiceDeleteManyArgsSchema: z.ZodType<Prisma.ServiceDeleteManyArgs> = z.object({
  where: ServiceWhereInputSchema.optional(),
}).strict() ;

export const ServiceAvailabilityCreateArgsSchema: z.ZodType<Prisma.ServiceAvailabilityCreateArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  data: z.union([ ServiceAvailabilityCreateInputSchema,ServiceAvailabilityUncheckedCreateInputSchema ]),
}).strict() ;

export const ServiceAvailabilityUpsertArgsSchema: z.ZodType<Prisma.ServiceAvailabilityUpsertArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  where: ServiceAvailabilityWhereUniqueInputSchema,
  create: z.union([ ServiceAvailabilityCreateInputSchema,ServiceAvailabilityUncheckedCreateInputSchema ]),
  update: z.union([ ServiceAvailabilityUpdateInputSchema,ServiceAvailabilityUncheckedUpdateInputSchema ]),
}).strict() ;

export const ServiceAvailabilityCreateManyArgsSchema: z.ZodType<Prisma.ServiceAvailabilityCreateManyArgs> = z.object({
  data: z.union([ ServiceAvailabilityCreateManyInputSchema,ServiceAvailabilityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceAvailabilityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ServiceAvailabilityCreateManyAndReturnArgs> = z.object({
  data: z.union([ ServiceAvailabilityCreateManyInputSchema,ServiceAvailabilityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ServiceAvailabilityDeleteArgsSchema: z.ZodType<Prisma.ServiceAvailabilityDeleteArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  where: ServiceAvailabilityWhereUniqueInputSchema,
}).strict() ;

export const ServiceAvailabilityUpdateArgsSchema: z.ZodType<Prisma.ServiceAvailabilityUpdateArgs> = z.object({
  select: ServiceAvailabilitySelectSchema.optional(),
  include: ServiceAvailabilityIncludeSchema.optional(),
  data: z.union([ ServiceAvailabilityUpdateInputSchema,ServiceAvailabilityUncheckedUpdateInputSchema ]),
  where: ServiceAvailabilityWhereUniqueInputSchema,
}).strict() ;

export const ServiceAvailabilityUpdateManyArgsSchema: z.ZodType<Prisma.ServiceAvailabilityUpdateManyArgs> = z.object({
  data: z.union([ ServiceAvailabilityUpdateManyMutationInputSchema,ServiceAvailabilityUncheckedUpdateManyInputSchema ]),
  where: ServiceAvailabilityWhereInputSchema.optional(),
}).strict() ;

export const ServiceAvailabilityDeleteManyArgsSchema: z.ZodType<Prisma.ServiceAvailabilityDeleteManyArgs> = z.object({
  where: ServiceAvailabilityWhereInputSchema.optional(),
}).strict() ;

export const AppointmentCreateArgsSchema: z.ZodType<Prisma.AppointmentCreateArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  data: z.union([ AppointmentCreateInputSchema,AppointmentUncheckedCreateInputSchema ]),
}).strict() ;

export const AppointmentUpsertArgsSchema: z.ZodType<Prisma.AppointmentUpsertArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
  create: z.union([ AppointmentCreateInputSchema,AppointmentUncheckedCreateInputSchema ]),
  update: z.union([ AppointmentUpdateInputSchema,AppointmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const AppointmentCreateManyArgsSchema: z.ZodType<Prisma.AppointmentCreateManyArgs> = z.object({
  data: z.union([ AppointmentCreateManyInputSchema,AppointmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AppointmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AppointmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ AppointmentCreateManyInputSchema,AppointmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AppointmentDeleteArgsSchema: z.ZodType<Prisma.AppointmentDeleteArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentUpdateArgsSchema: z.ZodType<Prisma.AppointmentUpdateArgs> = z.object({
  select: AppointmentSelectSchema.optional(),
  include: AppointmentIncludeSchema.optional(),
  data: z.union([ AppointmentUpdateInputSchema,AppointmentUncheckedUpdateInputSchema ]),
  where: AppointmentWhereUniqueInputSchema,
}).strict() ;

export const AppointmentUpdateManyArgsSchema: z.ZodType<Prisma.AppointmentUpdateManyArgs> = z.object({
  data: z.union([ AppointmentUpdateManyMutationInputSchema,AppointmentUncheckedUpdateManyInputSchema ]),
  where: AppointmentWhereInputSchema.optional(),
}).strict() ;

export const AppointmentDeleteManyArgsSchema: z.ZodType<Prisma.AppointmentDeleteManyArgs> = z.object({
  where: AppointmentWhereInputSchema.optional(),
}).strict() ;