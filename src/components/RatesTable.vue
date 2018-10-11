<template>
    <div class="rate-table md-layout" v-show="ratesRecords.length > 0">
        <md-table md-card v-model="ratesRecords" class="md-layout-item">
            <md-table-toolbar>
                <h1 class="md-title">Rates Result (% p.a.)</h1>
                <span class="md-caption"><strong>FD</strong> = Fixed Deposits <strong>SD</strong> = Saving Deposits </span>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{item}">
                <md-table-cell md-label="Period">{{item.end_of_month | dateFormat}}</md-table-cell>
                <md-table-cell md-label="Banks FD 3 mos." v-if="selected.indexOf('banks_fixed_deposits_3m') > -1">{{item.banks_fixed_deposits_3m || '-'}}</md-table-cell>
                <md-table-cell md-label="Finance Companies FD 3 mos." v-if="selected.indexOf('fc_fixed_deposits_3m') > -1">{{item.fc_fixed_deposits_3m || '-'}}</md-table-cell>
                <md-table-cell md-label="Banks FD 6 mos." v-if="selected.indexOf('banks_fixed_deposits_6m') > -1">{{item.banks_fixed_deposits_6m || '-'}}</md-table-cell>
                <md-table-cell md-label="Finance Companies FD 6 mos." v-if="selected.indexOf('fc_fixed_deposits_6m') > -1">{{item.fc_fixed_deposits_6m || '-'}}</md-table-cell>
                <md-table-cell md-label="Banks FD 12 mos." v-if="selected.indexOf('banks_fixed_deposits_12m') > -1">{{item.banks_fixed_deposits_12m || '-'}}</md-table-cell>
                <md-table-cell md-label="Finance Companies FD 12 mos." v-if="selected.indexOf('fc_fixed_deposits_12m') > -1">{{item.fc_fixed_deposits_12m || '-'}}</md-table-cell>
                <md-table-cell md-label="Banks SD" v-if="selected.indexOf('banks_savings_deposits') > -1">{{item.banks_savings_deposits || '-'}}</md-table-cell>
                <md-table-cell md-label="Finance Companies SD" v-if="selected.indexOf('fc_savings_deposits') > -1">{{item.fc_savings_deposits || '-'}}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'RatesTable',
    computed: {
        ...mapGetters('rateModule', {
            ratesRecords: 'getRatesRecords',
            selected: 'getSelected'
        })
    }
};
</script>
