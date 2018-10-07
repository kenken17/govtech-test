<template>
    <div class="rate">
        <form novalidate id="rateForm" class="md-layout" @submit.prevent="onSubmitData">
            <md-card class="md-layout-item">
                <md-card-header>
                    <div class="md-title">Rate Service</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="{'md-invalid': errors.has('startDate')}">
                                <label for="start-date">Start Date</label>
                                <md-input name="startDate" id="start-date" v-model.trim="formData.startDate" v-validate="'required|date_format:MMM-YYYY'" data-vv-as="Start Date" :disabled="sending" />
                                    <span class="md-helper-text">e.g. Jan-2018</span>
                                    <span class="md-error" v-show="errors.has('satrtDate')">{{ errors.first('startDate') }}</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="{'md-invalid': errors.has('endDate')}">
                                <label for="end-date">End Date</label>
                                <md-input name="endDate" id="end-date" v-model.trim="formData.endDate" v-validate="'required|date_format:MMM-YYYY'" data-vv-as="End Date" :disabled="sending" />
                                    <span class="md-helper-text">e.g. May-2018</span>
                                    <span class="md-error" v-if="errors.has('endDate')">{{ errors.first('endDate') }}</span>
                            </md-field>
                        </div>
                    </div>

                    <md-checkbox v-model="formData.selections" name="selections" value="banks_fixed_deposits_3m" :disabled="sending" v-validate="'atLeastOne'">Banks Fixed Deposits 3 Months</md-checkbox>
                    <md-checkbox v-model="formData.selections" name="selections" value="banks_fixed_deposits_6m" :disabled="sending">Banks Fixed Deposits 6 Months</md-checkbox>
                    <md-checkbox v-model="formData.selections" name="selections" value="banks_fixed_deposits_12m" :disabled="sending">Banks Fixed Deposits 12 Months</md-checkbox>
                    <md-checkbox v-model="formData.selections" name="selections" value="banks_savings_deposits" :disabled="sending">Banks Saving Deposits</md-checkbox>
                    <md-checkbox v-model="formData.selections" name="selections" value="fc_fixed_deposits_3m" :disabled="sending">Finance Companies Fixed Deposits 3 Months</md-checkbox>
                    <md-checkbox v-model="formData.selections" name="selections" value="fc_fixed_deposits_6m" :disabled="sending">Finance Companies Fixed Deposits 6 Months</md-checkbox>
                    <md-checkbox v-model="formData.selections" name="selections" value="fc_fixed_deposits_12m" :disabled="sending">Finance Companies Fixed Deposits 12 Months</md-checkbox>
                    <md-checkbox v-model="formData.selections" name="selections" value="fc_savings_deposits" :disabled="sending">Finance Companies Savings Deposits</md-checkbox>
                    <span class="warn md-caption" v-if="errors.has('selections')">{{ errors.first('selections') }}</span>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button type="reset" :disabled="sending" @click="onClearForm">Clear</md-button>
                    <md-button type="submit" class="md-primary" :disabled="sending">Submit</md-button>
                </md-card-actions>
            </md-card>
        </form>
    {{ratesResult}}
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import commonMixin from '@/mixins/commonMixin';

function onSubmitData() {
    this.$validator.validate().then((valid) => {
        if (!valid) return;

        const startDateStr = this.getDateStr(this.formData.startDate);
        const endDateStr = this.getDateStr(this.formData.endDate);

        this.sending = true;

        this
            .getMonthlyRates({
                startDateStr,
                endDateStr,
                selections: this.formData.selections
            })
            .then(() => {
                this.sending = false;
            });
    });
}

function onClearForm() {
    const clear = async () => {
        this.formData.startDate = null;
        this.formData.endDate = null;
        this.formData.selections = [];
    };

    clear().then(() => {
        this.$validator.reset();
    });

    this.sending = false;

    this.clearRatesResult();
}

export default {
    name: 'Rate',
    computed: {
        ...mapState('rateModule', [
            'ratesResult'
        ])
    },
    data() {
        return {
            formData: {
                startDate: null,
                endDate: null,
                selections: []
            },
            sending: false
        };
    },
    mixins: [commonMixin],
    methods: {
        ...mapActions('rateModule', [
            'getMonthlyRates',
            'clearRatesResult'
        ]),
        onSubmitData,
        onClearForm
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.md-checkbox {
    display: flex;
}

.warn {
    color: #ff1744;
}
</style>
