import { pgTable, pgSchema, foreignKey, unique, serial, varchar, boolean, timestamp, integer, text, numeric, date, bigint } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const financeProject = pgSchema("finance_project");


export const categoryMasterInFinanceProject = financeProject.table("category_master", {
	id: serial("id").primaryKey().notNull(),
	categoryname: varchar("categoryname", { length: 50 }).notNull(),
	type: varchar("type", { length: 255 }),
	isactive: boolean("isactive").notNull(),
	description: varchar("description", { length: 255 }),
	notes: varchar("Notes", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
},
(table) => {
	return {
		categoryMasterCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "category_master_created_by_fkey"
		}),
		categoryMasterUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "category_master_updated_by_fkey"
		}),
		ucName: unique("uc_name").on(table.categoryname),
	}
});

export const categoryHierarchyInFinanceProject = financeProject.table("category_hierarchy", {
	id: serial("id").primaryKey().notNull(),
	catId: integer("cat_id").notNull(),
	parentId: integer("parent_id").notNull(),
	isactive: boolean("isactive").notNull(),
	notes: text("notes"),
	description: text("description"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
},
(table) => {
	return {
		categoryHierarchyCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "category_hierarchy_created_by_fkey"
		}),
		categoryHierarchyUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "category_hierarchy_updated_by_fkey"
		}),
		fkCatId: foreignKey({
			columns: [table.catId],
			foreignColumns: [categoryMasterInFinanceProject.id],
			name: "fk_cat_id"
		}),
	}
});

export const costCenterInFinanceProject = financeProject.table("cost_center", {
	id: integer("id").default(sql`nextval('finance_project.department_master_id_seq'::regclass)`).primaryKey().notNull(),
	name: text("name").notNull(),
	type: text("type").notNull(),
	parentId: integer("parent_id").notNull(),
	description: text("description"),
	notes: text("notes"),
	isactive: boolean("isactive").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
},
(table) => {
	return {
		costCenterCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "cost_center_created_by_fkey"
		}),
		costCenterUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "cost_center_updated_by_fkey"
		}),
		ucCccType: unique("uc_ccc_type").on(table.name, table.description),
	}
});

export const departmentHierarchyInFinanceProject = financeProject.table("department_hierarchy", {
	id: serial("id").primaryKey().notNull(),
	deptId: integer("dept_id").notNull(),
	parentId: integer("parent_id").notNull(),
	isactive: boolean("isactive").notNull(),
	notes: text("notes"),
	description: text("description"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
},
(table) => {
	return {
		departmentHierarchyCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "department_hierarchy_created_by_fkey"
		}),
		departmentHierarchyUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "department_hierarchy_updated_by_fkey"
		}),
	}
});

export const donorMasterInFinanceProject = financeProject.table("donor_master", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	currency: text("currency").notNull(),
	notes: varchar("notes", { length: 255 }),
	description: varchar("description", { length: 255 }),
	isactive: boolean("isactive").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
	donorType: text("donor_type"),
},
(table) => {
	return {
		donorMasterCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "donor_master_created_by_fkey"
		}),
		donorMasterUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "donor_master_updated_by_fkey"
		}),
	}
});

export const departmentMasterInFinanceProject = financeProject.table("department_master", {
	id: serial("id").primaryKey().notNull(),
	departmentname: varchar("departmentname", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	deptCode: integer("dept_code"),
	isactive: boolean("isactive").notNull(),
	notes: varchar("notes", { length: 255 }),
	description: varchar("description", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
},
(table) => {
	return {
		departmentMasterCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "department_master_created_by_fkey"
		}),
		departmentMasterUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "department_master_updated_by_fkey"
		}),
		departmentMasterDepartmentnameKey: unique("department_master_departmentname_key").on(table.departmentname),
		departmentMasterDeptCodeKey: unique("department_master_dept_code_key").on(table.deptCode),
	}
});

export const donorBudgetInFinanceProject = financeProject.table("donor_budget", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "finance_project.donor_budget_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	donorId: integer("donor_id").notNull(),
	finYear: text("fin_year").notNull(),
	plannedBudget: numeric("planned_budget", { precision: 8, scale:  2 }).notNull(),
	receivedBudget: numeric("received_budget", { precision: 8, scale:  2 }).notNull(),
	balanceDonation: numeric("balance_donation", { precision: 8, scale:  2 }).notNull(),
	notes: varchar("notes", { length: 255 }),
	description: varchar("description", { length: 255 }),
	isactive: boolean("isactive").notNull(),
	createdBy: integer("created_by").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedBy: integer("updated_by"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		fkCreatedby: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "fk_createdby"
		}),
		fkDonorId: foreignKey({
			columns: [table.donorId],
			foreignColumns: [donorMasterInFinanceProject.id],
			name: "fk_donor_id"
		}),
		fkUpdatedby: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "fk_updatedby"
		}),
	}
});

export const knexMigrationsInFinanceProject = financeProject.table("knex_migrations", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	batch: integer("batch"),
	migrationTime: timestamp("migration_time", { withTimezone: true, mode: 'string' }),
});

export const knexMigrationsLockInFinanceProject = financeProject.table("knex_migrations_lock", {
	index: serial("index").primaryKey().notNull(),
	isLocked: integer("is_locked"),
});

export const roleMasterInFinanceProject = financeProject.table("role_master", {
	id: serial("id").primaryKey().notNull(),
	role: varchar("role", { length: 255 }).notNull(),
});

export const budgetMasterInFinanceProject = financeProject.table("budget_master", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	financialYear: text("financial_year").notNull(),
	notes: varchar("notes", { length: 255 }),
	description: varchar("description", { length: 255 }),
	isactive: boolean("isactive").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
},
(table) => {
	return {
		budgetMasterCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "budget_master_created_by_fkey"
		}),
		budgetMasterUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "budget_master_updated_by_fkey"
		}),
		budgetMasterVersionFinancialYearUnique: unique("budget_master_version_financial_year_unique").on(table.name, table.financialYear),
	}
});

export const tallyStaffInFinanceProject = financeProject.table("tally_staff", {
	id: serial("id").primaryKey().notNull(),
	voucherName: varchar("voucher_name", { length: 25 }).notNull(),
	voucherNum: integer("voucher_num").notNull(),
	ledgerName: varchar("ledger_name", { length: 255 }).notNull(),
	transactionId: text("transaction_id"),
	date: date("date").notNull(),
	accountType: varchar("account_type", { length: 255 }).notNull(),
	amount: numeric("amount", { precision: 8, scale:  2 }).notNull(),
	empNo: integer("emp_no").notNull(),
	isExpense: text("is_expense").notNull(),
	currency: text("currency").notNull(),
	narration: varchar("narration", { length: 255 }).notNull(),
	notes: varchar("notes", { length: 255 }),
	isactive: boolean("isactive").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by"),
	updatedBy: integer("updated_by"),
	finMonth: text("fin_month").notNull(),
	finYear: text("fin_year").notNull(),
},
(table) => {
	return {
		tallyStaffCc: foreignKey({
			columns: [table.empNo],
			foreignColumns: [costCenterInFinanceProject.id],
			name: "tally_staff_cc"
		}),
		tallyStaffCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "tally_staff_created_by_fkey"
		}),
		tallyStaffUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "tally_staff_updated_by_fkey"
		}),
	}
});

export const tallyDepartmentInFinanceProject = financeProject.table("tally_department", {
	id: serial("id").primaryKey().notNull(),
	voucherName: varchar("voucher_name", { length: 25 }).notNull(),
	voucherNum: integer("voucher_num").notNull(),
	ledgerName: varchar("ledger_name", { length: 255 }).notNull(),
	transactionId: text("transaction_id"),
	date: timestamp("date", { withTimezone: true, mode: 'string' }).notNull(),
	accountType: varchar("account_type", { length: 255 }).notNull(),
	amount: numeric("amount", { precision: 12, scale:  2 }).notNull(),
	costCenter: integer("cost_center").notNull(),
	isExpense: text("is_expense").notNull(),
	currency: text("currency").notNull(),
	narration: varchar("narration", { length: 255 }).notNull(),
	notes: varchar("notes", { length: 255 }),
	isactive: boolean("isactive").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
	finMonth: text("fin_month").notNull(),
	finYear: text("fin_year").notNull(),
},
(table) => {
	return {
		tallyDepartmentCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "tally_department_created_by_fkey"
		}),
		tallyDepartmentDeptCodeFkey: foreignKey({
			columns: [table.costCenter],
			foreignColumns: [costCenterInFinanceProject.id],
			name: "tally_department_dept_code_fkey"
		}),
		tallyDepartmentUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "tally_department_updated_by_fkey"
		}),
	}
});

export const budgetDetailsInFinanceProject = financeProject.table("budget_details", {
	id: serial("id").primaryKey().notNull(),
	budgetid: integer("budgetid").notNull(),
	catid: integer("catid").notNull(),
	unit: integer("unit").notNull(),
	rate: numeric("rate", { precision: 12, scale:  2 }).notNull(),
	total: numeric("total", { precision: 12, scale:  2 }).notNull(),
	currency: text("currency"),
	isactive: boolean("isactive").notNull(),
	notes: varchar("notes", { length: 500 }),
	description: text("description"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
	overhead: text("overhead"),
	deptId: integer("deptId"),
	subDeptId: integer("subDeptId"),
	clusterId: integer("clusterId"),
},
(table) => {
	return {
		budgetDetailsBudgetidFkey: foreignKey({
			columns: [table.budgetid],
			foreignColumns: [budgetMasterInFinanceProject.id],
			name: "budget_details_budgetid_fkey"
		}),
		budgetDetailsCatidFkey: foreignKey({
			columns: [table.catid],
			foreignColumns: [categoryMasterInFinanceProject.id],
			name: "budget_details_catid_fkey"
		}),
		budgetDetailsCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "budget_details_created_by_fkey"
		}),
		budgetDetailsUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "budget_details_updated_by_fkey"
		}),
	}
});

export const userMasterInFinanceProject = financeProject.table("user_master", {
	id: serial("id").primaryKey().notNull(),
	username: varchar("username", { length: 100 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	email: varchar("email", { length: 100 }),
	fullName: text("full_name"),
	role: text("role"),
	isactive: boolean("isactive").notNull(),
	notes: varchar("notes", { length: 255 }),
	description: varchar("description", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by"),
	updatedBy: integer("updated_by"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	phonenumber: bigint("phonenumber", { mode: "number" }).notNull(),
},
(table) => {
	return {
		createdByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [table.id],
			name: "created_by_fkey"
		}),
		updatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [table.id],
			name: "updated_by_fkey"
		}),
		userMasterUsernameKey: unique("user_master_username_key").on(table.username),
	}
});

export const staffMasterInFinanceProject = financeProject.table("staff_master", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 25 }).notNull(),
	empNo: text("emp_no").notNull(),
	isactive: boolean("isactive").notNull(),
	notes: varchar("notes", { length: 255 }),
	description: varchar("description", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
	department: integer("department"),
},
(table) => {
	return {
		departmentMasterByFkey: foreignKey({
			columns: [table.department],
			foreignColumns: [departmentMasterInFinanceProject.id],
			name: "department_master_by_fkey"
		}),
		staffMasterCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "staff_master_created_by_fkey"
		}),
		staffMasterUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "staff_master_updated_by_fkey"
		}),
		staffMasterEmpNoKey: unique("staff_master_emp_no_key").on(table.empNo),
	}
});

export const tallyDonorInFinanceProject = financeProject.table("tally_donor", {
	id: serial("id").primaryKey().notNull(),
	voucherName: varchar("voucher_name", { length: 25 }).notNull(),
	voucherNum: integer("voucher_num").notNull(),
	ledgerName: varchar("ledger_name", { length: 255 }).notNull(),
	transactionId: text("transaction_id"),
	date: timestamp("date", { withTimezone: true, mode: 'string' }).notNull(),
	accountType: varchar("account_type", { length: 255 }).notNull(),
	amount: numeric("amount", { precision: 12, scale:  2 }).notNull(),
	costCenter: integer("cost_center").notNull(),
	isExpense: text("is_expense").notNull(),
	currency: text("currency").notNull(),
	narration: varchar("narration", { length: 255 }).notNull(),
	notes: varchar("notes", { length: 255 }),
	isactive: boolean("isactive").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
	finMonth: text("fin_month").notNull(),
	finYear: text("fin_year").notNull(),
},
(table) => {
	return {
		tallyDonorCreatedByFkey: foreignKey({
			columns: [table.createdBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "tally_donor_created_by_fkey"
		}),
		tallyDonorDonorCodeFkey: foreignKey({
			columns: [table.costCenter],
			foreignColumns: [costCenterInFinanceProject.id],
			name: "tally_donor_donor_code_fkey"
		}),
		tallyDonorUpdatedByFkey: foreignKey({
			columns: [table.updatedBy],
			foreignColumns: [userMasterInFinanceProject.id],
			name: "tally_donor_updated_by_fkey"
		}),
	}
});