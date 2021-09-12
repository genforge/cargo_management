frappe.listview_settings['Package'] = {
    add_fields: ['status', 'carrier'],
    filters: [
        ['status', 'not in', ['Finished', 'Cancelled', 'Returned to Sender', 'fully_refunded']],
    ],
    hide_name_column: true,

    get_indicator(doc) {
        const status_color = {
            'Awaiting Receipt': 'lightblue',
            'Awaiting Confirmation': 'orange',
            'In Extraordinary Confirmation': 'pink',
            'Awaiting Departure': 'cyan',
            'In Transit': 'purple',
            'In Customs': 'gray',
            'Sorting': 'yellow',
            'Available to Pickup': 'blue',
            'Finished': 'green',
            'Cancelled': 'darkgrey',
            'Never Arrived': 'red',
            'Returned to Sender': 'red',
        };

        return [__(doc.status), status_color[doc.status], 'status,=,' + doc.status];
    },

    // onload: function (listview) {
    //     listview.page.add_actions_menu_item(__('Update data from carrier'), function () {
            // TODO FINISH.... This is work in progress
            // Bulk Dialog - should sent email if status is changed?
            // Bulk show_progress. This actually reloads the form? if so. how many times?
            // listview.call_for_selected_items(
            //     'cargo_management.package_management.doctype.package.actions.update_data_from_carrier_bulk'
            // );
        // })
    // },

    button: {
        show(doc) {
            return doc.name;
        },
        get_label() {
            return __('Carrier page')
        },
        get_description() {
            return __('Visit carrier detail page')
        },
        action(doc) {
            frappe.call({
                method: 'cargo_management.package_management.doctype.package.actions.get_carrier_detail_page_url',
                type: 'GET',
                args: {carrier: doc.carrier},
                freeze: true,
                freeze_message: __('Opening detail page...'),
                callback: (r) => {
                    window.open(r.message + doc.tracking_number, '_blank');
                }
            });
        },
    },
}
